#!/bin/bash

# Terminate background processes on exit
trap "kill 0" EXIT

echo "🚀 쇼핑몰 애플리케이션 시작 중..."

# 1. Back-end 실행
echo "☕ 백엔드(Spring Boot) 실행 중..."
./gradlew bootRun > backend.log 2>&1 &
BACKEND_PID=$!

# 2. Front-end 실행
echo "⚛️ 프론트엔드(Next.js) 실행 중..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!

echo "------------------------------------------------"
echo "✅ 백엔드: http://localhost:8080"
echo "✅ Swagger: http://localhost:8080/swagger-ui/index.html"
echo "✅ 프론트엔드: http://localhost:3000"
echo "------------------------------------------------"
echo "로그는 backend.log와 frontend.log에서 확인하실 수 있습니다."
echo "종료하려면 Ctrl+C를 누르세요."

# Wait for background processes
wait
