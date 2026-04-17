#!/usr/bin/env bash
# github-monorepo-init-push：本地已有提交 → GitHub 建库并推送 main
# 用法见 README「同步到 GitHub」
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO_SHORT="${GITHUB_REPO_NAME:-ningguo-renfeng-next}"
OWNER="${GITHUB_OWNER:-hualang}"
FULL="$OWNER/$REPO_SHORT"

# 可写 gh 配置目录（避免 ~/.config/gh 权限问题）
export GH_CONFIG_DIR="${GH_CONFIG_DIR:-$ROOT/../.gh-config}"
mkdir -p "$GH_CONFIG_DIR"

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

if ! command -v gh >/dev/null 2>&1; then
  echo "请先安装: brew install gh"
  exit 1
fi

# 步骤 2：PAT 登录（非交互），遵守 skill：从 stdin / 环境读 token，禁止写进仓库
if [ -n "${GITHUB_TOKEN:-}" ] || [ -n "${GH_TOKEN:-}" ]; then
  TOK="${GITHUB_TOKEN:-$GH_TOKEN}"
  printf '%s' "$TOK" | gh auth login --with-token -h github.com 2>/dev/null || true
fi

if gh auth status -h github.com >/dev/null 2>&1; then
  echo "✓ gh 已登录"
  if gh repo view "$FULL" >/dev/null 2>&1; then
    echo "远端仓库已存在: $FULL"
    git remote remove origin 2>/dev/null || true
    git remote add origin "git@github.com:${FULL}.git"
    git push -u origin main
  else
    echo "创建仓库并推送: $FULL"
    git remote remove origin 2>/dev/null || true
    gh repo create "$REPO_SHORT" --public --source . --remote origin --push
  fi
  echo "完成: https://github.com/$FULL"
  exit 0
fi

# 无 gh 登录时：若提供 GH_TOKEN，仅用 REST 建库 + SSH 推送（skill 步骤 3/4）
if [ -n "${GITHUB_TOKEN:-}" ] || [ -n "${GH_TOKEN:-}" ]; then
  TOK="${GITHUB_TOKEN:-$GH_TOKEN}"
  echo "gh 未登录，使用 GitHub API 创建空仓库后 SSH 推送…"
  code=$(curl -sS -o /tmp/gh-create-repo.json -w "%{http_code}" \
    -X POST "https://api.github.com/user/repos" \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $TOK" \
    -d "{\"name\":\"$REPO_SHORT\",\"private\":false,\"auto_init\":false}")
  if [ "$code" = "422" ]; then
    echo "仓库可能已存在，尝试直接推送…"
  elif [ "$code" != "201" ]; then
    echo "API 创建失败 HTTP $code，响应:"
    cat /tmp/gh-create-repo.json
    exit 1
  fi
  git remote remove origin 2>/dev/null || true
  git remote add origin "git@github.com:${FULL}.git"
  git push -u origin main
  echo "完成: https://github.com/$FULL"
  exit 0
fi

echo "未配置 GitHub 凭证。请任选其一后重试："
echo "  1) 交互登录: gh auth login -h github.com"
echo "  2) 非交互: export GITHUB_TOKEN=你的PAT 再运行本脚本（PAT 需含 repo 权限）"
echo "  3) 仅在网页创建空仓库 $FULL 后: git remote add origin git@github.com:${FULL}.git && git push -u origin main"
exit 1
