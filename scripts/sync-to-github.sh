#!/usr/bin/env bash
# 将本仓库推送到 GitHub（需已安装 GitHub CLI：brew install gh）
# 首次使用请先执行：gh auth login
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_NAME="${GITHUB_REPO_NAME:-ningguo-renfeng-next}"
VISIBILITY="${GITHUB_REPO_VISIBILITY:-public}" # public | private

if ! command -v gh >/dev/null 2>&1; then
  echo "未找到 gh，请先安装: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "尚未登录 GitHub，请先在本机执行一次:"
  echo "  gh auth login -h github.com"
  echo "按提示用浏览器或 token 完成授权后再运行本脚本。"
  exit 1
fi

USER=$(gh api user -q .login 2>/dev/null || true)
if [[ -z "$USER" ]]; then
  echo "无法读取当前 GitHub 用户名，请检查 gh auth status"
  exit 1
fi
echo "当前 GitHub 账号: $USER"

if git remote get-url origin >/dev/null 2>&1; then
  echo "已存在 origin，执行 git push..."
  git push -u origin main
  echo "完成: https://github.com/$USER/$REPO_NAME"
  exit 0
fi

echo "创建远端仓库 $USER/$REPO_NAME ($VISIBILITY) 并推送..."
# 若仓库已存在，仅添加 remote 并 push
if gh repo view "$USER/$REPO_NAME" >/dev/null 2>&1; then
  git remote add origin "https://github.com/$USER/$REPO_NAME.git"
  git push -u origin main
else
  if [[ "$VISIBILITY" == "private" ]]; then
    gh repo create "$REPO_NAME" --private --source=. --remote=origin --push
  else
    gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
  fi
fi

echo "完成: https://github.com/$USER/$REPO_NAME"
