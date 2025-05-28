// hoc/withAuth.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/store/auth";
import { useToast } from "@/hooks/use-toast";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const { isLoggedIn, hasHydrated } = useAuthStore();
    const { toast } = useToast();

    useEffect(() => {
      if (hasHydrated && !isLoggedIn) {
        toast({
          title: "Chưa đăng nhập",
          description: "Vui lòng đăng nhập để tiếp tục.",
          variant: "destructive",
        });
        router.replace("/xac-thuc/dang-nhap");
      }
    }, [hasHydrated, isLoggedIn]);

    if (!hasHydrated || !isLoggedIn) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
