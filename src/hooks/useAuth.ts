import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取初始会话
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email?: string, password?: string) => {
    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } else {
      // 简单的登录流程，可以扩展为完整的登录表单
      const email = prompt('请输入邮箱:');
      const password = prompt('请输入密码:');
      
      if (email && password) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          // 如果登录失败，尝试注册
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          });
          return { error: signUpError };
        }
        
        return { error: null };
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    loading,
    signIn,
    signOut,
  };
};