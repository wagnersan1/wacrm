"use client";

import type { ReactNode } from "react";
import { useFacebookLoginStatus } from "@/hooks/use-facebook-login-status";

type FacebookLoginGateProps = {
  children?: ReactNode;
  scope?: string;
};

export function FacebookLoginGate({
  children,
  scope = "public_profile,email",
}: FacebookLoginGateProps) {
  const { status } = useFacebookLoginStatus();

  if (status === "loading") {
    return null;
  }

  if (status === "connected") {
    // TODO: plugar aqui o redirecionamento ou conteudo protegido do app.
    return <>{children ?? <p>Voce esta conectado ao Facebook.</p>}</>;
  }

  const handleLogin = () => {
    window.FB?.login(
      () => {
        window.FB?.getLoginStatus(() => window.location.reload());
      },
      { scope },
    );
  };

  return (
    <button type="button" onClick={handleLogin}>
      Entrar com Facebook
    </button>
  );
}
