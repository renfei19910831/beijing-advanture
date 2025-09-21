import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, HeartHandshake } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuthContext } from '@/components/AuthProvider';

interface FollowButtonProps {
  photographerId: string;
  photographerName: string;
  className?: string;
}

export const FollowButton = ({ photographerId, photographerName, className }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, signIn } = useAuthContext();

  // 检查关注状态
  useEffect(() => {
    checkFollowStatus();
  }, [photographerId, user]);

  const checkFollowStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('photographer_follows')
        .select('*')
        .eq('user_id', user.id)
        .eq('photographer_id', photographerId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking follow status:', error);
        return;
      }

      setIsFollowing(!!data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFollow = async () => {
    if (!user) {
      // 如果用户未登录，提示登录
      toast({
        title: "需要登录",
        description: "请先登录后再关注摄影师",
        variant: "destructive",
      });
      signIn();
      return;
    }

    setIsLoading(true);

    try {
      if (isFollowing) {
        // 取消关注
        const { error } = await supabase
          .from('photographer_follows')
          .delete()
          .eq('user_id', user.id)
          .eq('photographer_id', photographerId);

        if (error) throw error;

        setIsFollowing(false);
        toast({
          title: "取消关注成功",
          description: `已取消关注 ${photographerName}`,
        });
      } else {
        // 添加关注
        const { error } = await supabase
          .from('photographer_follows')
          .insert([
            {
              user_id: user.id,
              photographer_id: photographerId,
              followed_at: new Date().toISOString()
            }
          ]);

        if (error) throw error;

        setIsFollowing(true);
        toast({
          title: "关注成功",
          description: `已成功关注 ${photographerName}，可在个人中心查看关注的摄影师`,
        });
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      size="lg"
      onClick={handleFollow}
      disabled={isLoading}
      className={`transition-all duration-200 ${className} ${
        isFollowing 
          ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
          : 'bg-gradient-primary hover:opacity-90'
      }`}
    >
      {isFollowing ? (
        <>
          <HeartHandshake className="w-4 h-4 mr-2" />
          已关注
        </>
      ) : (
        <>
          <Heart className="w-4 h-4 mr-2" />
          关注
        </>
      )}
    </Button>
  );
};