# Lazorkit Bounty 执行计划

**项目**: Lazorkit SDK Integration Bounty
**金额**: $125-$700（第1-5名）
**截止**: 2026/01/15
**开始时间**: 2026/03/02 23:05 GMT+8

---

## 竞争分析

**已有提交**:
1. LazorPay (lamb356) - Web 支付 demo
2. Next.js Integration (Pitrat-wav) - Web 集成
3. HYPHA + LazorKit - AI agent 集成

**差异化策略**: 
- ✅ React Native + Expo（移动端，大多数是 Web）
- ✅ 生物识别登录（FaceID/指纹，真正的移动端特性）
- ✅ 中英双语文档（面向中文 Solana 社区）
- ✅ 详细教程（超过 2 个 required）

---

## 技术栈

```
Frontend: React Native + Expo
Language: TypeScript
Blockchain: Solana Devnet
SDK: @lazorkit/sdk
Auth: Passkey + Biometric
```

---

## 交付物

### 1. Working Example Repo
```
lazorkit-mobile/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx       # Passkey 登录
│   │   ├── HomeScreen.tsx        # 主页
│   │   └── SendScreen.tsx        # Gasless 转账
│   ├── components/
│   │   ├── PasskeyButton.tsx     # Passkey 按钮
│   │   └── GaslessTransfer.tsx   # Gasless 组件
│   ├── hooks/
│   │   ├── useLazorkit.ts        # SDK hook
│   │   └── useBiometric.ts       # 生物识别
│   └── utils/
│       └── solana.ts             # Solana 工具
├── App.tsx
├── README.md                     # 中英双语
└── docs/
    ├── tutorial-1-passkey.md     # Passkey 教程
    ├── tutorial-2-gasless.md     # Gasless 教程
    └── tutorial-3-biometric.md   # 生物识别教程
```

### 2. Quick-Start Guide (README.md)
- [x] Project overview
- [ ] SDK installation & config
- [ ] Environment setup
- [ ] Instructions to run

### 3. Step-by-Step Tutorials
1. **Tutorial 1**: How to create a passkey-based wallet
2. **Tutorial 2**: How to trigger a gasless transaction
3. **Tutorial 3**: How to add biometric authentication (BONUS)

### 4. Live Demo
- Expo Dev Client + EAS Build
- Devnet 部署

---

## 评分标准对标

| Category | Weight | 我们的策略 |
|----------|--------|-----------|
| Clarity & Usefulness (40%) | 高 | 中英双语 README + 3个教程 + 详细注释 |
| SDK Integration Quality (30%) | 高 | Passkey + Gasless + Biometric |
| Code Structure (30%) | 高 | 清晰的 hooks/components 结构 + TS |

---

## 执行步骤

### Phase 1: Setup (1h)
- [x] 创建 Expo 项目
- [ ] 安装依赖 (@lazorkit/sdk, @solana/web3.js)
- [ ] 配置 TypeScript

### Phase 2: Core Integration (3h)
- [ ] Passkey 登录流程
- [ ] Gasless 转账
- [ ] Session 持久化

### Phase 3: Biometric (2h)
- [ ] expo-local-authentication 集成
- [ ] FaceID/指纹验证
- [ ] 与 Passkey 结合

### Phase 4: Documentation (2h)
- [ ] README.md (中英双语)
- [ ] 3个教程文档
- [ ] 代码注释

### Phase 5: Deploy (1h)
- [ ] Expo Dev Client
- [ ] Devnet 测试
- [ ] 提交 bounty

---

## 风险评估

**技术风险**: 中
- Lazorkit SDK 可能有 React Native 兼容性问题
- Passkey 在移动端需要原生模块支持

**竞争风险**: 中
- 已有多人提交
- 但移动端方案是差异化优势

**时间风险**: 低
- 截止 2026/01/15，还有充足时间

---

## 下一步

1. 等待 Expo 项目创建完成
2. 安装 Lazorkit SDK
3. 实现 Passkey 登录
