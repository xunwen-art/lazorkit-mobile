# Passkey 登录教程

本教程将教你如何在 React Native + Expo 应用中实现 Lazorkit Passkey 认证。

## 前置要求

- React Native 基础知识
- 了解 Solana 基本概念
- 安装好 Expo 环境

---

## 第一步：安装依赖

```bash
npm install @lazorkit/wallet-mobile-adapter @solana/web3.js
```

---

## 第二步：创建 Lazorkit Provider

创建 `src/providers/LazorkitProvider.tsx`：

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LazorKitMobileAdapter } from '@lazorkit/wallet-mobile-adapter';
import { Connection, clusterApiUrl } from '@solana/web3.js';

interface LazorkitContextType {
  adapter: LazorKitMobileAdapter | null;
  publicKey: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const LazorkitContext = createContext<LazorkitContextType>({} as any);

export const LazorkitProvider: React.FC = ({ children }) => {
  const [adapter, setAdapter] = useState<LazorKitMobileAdapter | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize adapter
    const connection = new Connection(clusterApiUrl('devnet'));
    const lazorAdapter = new LazorKitMobileAdapter({
      connection,
      rpId: 'your-rp-id', // Your relying party ID
    });
    setAdapter(lazorAdapter);

    // Listen for connection changes
    lazorAdapter.on('connect', () => {
      setPublicKey(lazorAdapter.publicKey?.toBase58() || null);
      setIsConnected(true);
    });

    lazorAdapter.on('disconnect', () => {
      setPublicKey(null);
      setIsConnected(false);
    });

    return () => {
      lazorAdapter.removeAllListeners();
    };
  }, []);

  const connect = async () => {
    if (!adapter) return;
    try {
      await adapter.connect();
    } catch (error) {
      console.error('Failed to connect:', error);
      throw error;
    }
  };

  const disconnect = async () => {
    if (!adapter) return;
    try {
      await adapter.disconnect();
    } catch (error) {
      console.error('Failed to disconnect:', error);
      throw error;
    }
  };

  return (
    <LazorkitContext.Provider value={{ adapter, publicKey, isConnected, connect, disconnect }}>
      {children}
    </LazorkitContext.Provider>
  );
};

export const useLazorkit = () => useContext(LazorkitContext);
```

---

## 第三步：创建登录界面

创建 `src/screens/LoginScreen.tsx`：

```typescript
import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { useLazorkit } from '../providers/LazorkitProvider';

export const LoginScreen: React.FC = () => {
  const { connect, isConnected, publicKey } = useLazorkit();
  const [loading, setLoading] = useState(false);

  const handlePasskeyLogin = async () => {
    setLoading(true);
    try {
      await connect();
      Alert.alert('Success', 'Logged in with Passkey!');
    } catch (error) {
      Alert.alert('Error', 'Failed to login');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Connected!</Text>
        <Text>Wallet: {publicKey?.slice(0, 8)}...{publicKey?.slice(-8)}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Lazorkit Mobile</Text>
      <Button
        title={loading ? 'Connecting...' : 'Login with Passkey'}
        onPress={handlePasskeyLogin}
        disabled={loading}
      />
    </View>
  );
};
```

---

## 第四步：在 App 中使用

修改 `App.tsx`：

```typescript
import React from 'react';
import { LazorkitProvider } from './src/providers/LazorkitProvider';
import { LoginScreen } from './src/screens/LoginScreen';

export default function App() {
  return (
    <LazorkitProvider>
      <LoginScreen />
    </LazorkitProvider>
  );
}
```

---

## 第五步：测试

1. 运行应用：`npm run ios` 或 `npm run android`
2. 点击 "Login with Passkey" 按钮
3. 系统会弹出 Passkey 创建/登录界面
4. 使用 FaceID/TouchID 验证
5. 成功后显示钱包地址

---

## 工作原理

1. **Passkey 创建**：首次登录时，Lazorkit 会创建一个新的 Passkey
2. **密钥派生**：Passkey 用于派生 Solana 钱包私钥
3. **智能钱包**：实际使用的是基于 Passkey 的智能合约钱包
4. **无密码**：完全依赖生物识别，无需记住密码

---

## 常见问题

**Q: Passkey 存储在哪里？**
A: Passkey 存储在设备的钥匙串中，由操作系统安全保护。

**Q: 可以在多个设备上使用吗？**
A: 是的，Passkey 可以通过 iCloud/Google 同步到其他设备。

**Q: 丢失设备怎么办？**
A: 需要提前备份恢复短语或设置多个 Passkey。

---

## 下一步

- 学习 [Gasless Transactions](./tutorial-2-gasless.md)
- 学习 [Biometric Authentication](./tutorial-3-biometric.md)

---

**教程作者**: Dead Lobster (死龍蝦)
**最后更新**: 2026-03-02
