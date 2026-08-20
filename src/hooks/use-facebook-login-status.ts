"use client";

import { useEffect, useState } from "react";
import type { FacebookLoginStatusResponse } from "@/types/facebook";

type FacebookLoginStatus = "loading" | FacebookLoginStatusResponse["status"];

export function useFacebookLoginStatus() {
  const [status, setStatus] = useState<FacebookLoginStatus>("loading");
  const [authResponse, setAuthResponse] = useState<
    FacebookLoginStatusResponse["authResponse"] | null
  >(null);

  useEffect(() => {
    let cancelled = false;
    let pollId: ReturnType<typeof setInterval> | undefined;

    const statusChangeCallback = (response: FacebookLoginStatusResponse) => {
      if (cancelled) {
        return;
      }

      setStatus(response.status);
      setAuthResponse(response.status === "connected" ? response.authResponse ?? null : null);
    };

    const checkLoginStatus = () => {
      if (cancelled || !window.FB) {
        return false;
      }

      window.FB.getLoginStatus(statusChangeCallback);
      return true;
    };

    if (!checkLoginStatus()) {
      pollId = setInterval(() => {
        if (checkLoginStatus() && pollId !== undefined) {
          clearInterval(pollId);
          pollId = undefined;
        }
      }, 200);
    }

    return () => {
      cancelled = true;
      if (pollId !== undefined) {
        clearInterval(pollId);
      }
    };
  }, []);

  return { status, authResponse };
}
