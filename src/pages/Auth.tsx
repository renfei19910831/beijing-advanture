import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Eye, EyeOff, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.confirmPassword !== undefined) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "密码不匹配",
  path: ["confirmPassword"],
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
    setSuccess('');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const validatedData = authSchema.parse({
        email: formData.email,
        password: formData.password
      });

      const { error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('邮箱或密码错误，请检查后重试');
        } else {
          setError(error.message);
        }
      } else {
        navigate('/');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('登录失败，请稍后重试');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const validatedData = authSchema.parse({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          setError('该邮箱已注册，请直接登录');
        } else {
          setError(error.message);
        }
      } else {
        setSuccess('注册成功！请检查邮箱确认链接完成注册');
        setFormData({ email: '', password: '', confirmPassword: '' });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('注册失败，请稍后重试');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero image */}
        <div className="hidden lg:block relative">
          <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <div className="flex items-center mb-4">
                <Camera className="w-8 h-8 mr-3" />
                <span className="text-xl font-semibold">Atelier Capture</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">发现优秀的摄影师</h2>
              <p className="text-lg text-white/90">连接摄影师与客户的专业平台</p>
            </div>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Link>
          </div>

          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {isSignUp ? '创建账户' : '登录账户'}
              </CardTitle>
              <CardDescription>
                {isSignUp 
                  ? '注册成为摄影师或客户' 
                  : '登录您的摄影师账户'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {error && (
                <Alert className="mb-4 border-destructive">
                  <AlertDescription className="text-destructive">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-green-500">
                  <AlertDescription className="text-green-600">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {!isSignUp ? (
                /* 登录表单 */
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="请输入您的邮箱"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="请输入您的密码"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? '登录中...' : '登录'}
                  </Button>

                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(true);
                        setError('');
                        setSuccess('');
                      }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      还没有账号？<span className="font-medium text-primary">注册账号</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* 注册表单 */
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">邮箱</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="请输入您的邮箱"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">密码</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="请输入密码（至少6个字符）"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">确认密码</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="请再次输入密码"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? '注册中...' : '创建账户'}
                  </Button>

                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(false);
                        setError('');
                        setSuccess('');
                        setFormData({ email: '', password: '', confirmPassword: '' });
                      }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      已有账号？<span className="font-medium text-primary">返回登录</span>
                    </button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;