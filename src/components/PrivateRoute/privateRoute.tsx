import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { redirectRules } from './redirectRules';
import { RedirectRule } from './types';

export function privateRoute(WrappedComponent: React.ComponentType) {
  const NewComponent = () => {
    const navigate = useNavigate();

    const { userData } = useAuthUser();

    const currentRoute: string | undefined = window.location.pathname;

    const rule: RedirectRule | undefined = redirectRules[currentRoute];

    useEffect(() => {
      if (rule !== undefined) {
        // Нам нужны два режима работы. Либо мы редиректим, когда есть авторизация.
        // Либо же наоборот, когда ее нет.
        if (rule.redirectIfAuthorized && userData) {
          navigate(rule.path, { replace: true });
        } else if (!rule.redirectIfAuthorized && !userData) {
          navigate(rule.path, { replace: true });
        }
      }
    }, [navigate, rule, userData]);

    return <WrappedComponent />;
  };

  return NewComponent;
}
