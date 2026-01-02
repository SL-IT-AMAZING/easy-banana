#!/bin/bash
# EasyBanana 웹사이트 배포 스크립트
# 사용법: ./scripts/deploy-site.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PUBLIC_DIR="$PROJECT_DIR/packages/web/public"
DEPLOY_DIR="/tmp/easy-banana-deploy"

echo "🍌 EasyBanana 사이트 배포 중..."

# 임시 폴더 준비
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# 파일 복사
cp "$PUBLIC_DIR/index.html" "$DEPLOY_DIR/"
cp "$PUBLIC_DIR/config.json" "$DEPLOY_DIR/"
cp "$PUBLIC_DIR/install" "$DEPLOY_DIR/"
cp "$PUBLIC_DIR/vercel.json" "$DEPLOY_DIR/" 2>/dev/null || true

# Vercel 프로젝트 설정
mkdir -p "$DEPLOY_DIR/.vercel"
cat > "$DEPLOY_DIR/.vercel/project.json" << 'EOF'
{"projectId":"prj_k1POgELIw0ImED6cY2gt5x9BcQ9Z","orgId":"team_qANyNq3ggvbIJjefvWeAfedp"}
EOF

# 배포
cd "$DEPLOY_DIR"
npx vercel deploy --prod --yes

echo ""
echo "✅ 배포 완료!"
echo "🔗 https://easy-banana.com"
