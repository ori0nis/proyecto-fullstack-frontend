import type { ReactNode } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { BrokenRouteAvoider, PrivateGuard, PrivateRouter } from ".";

interface Props {
  children: ReactNode;
}

export const Router = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <BrokenRouteAvoider>
          <Route path="/login" /* TODO: add element */ />
          <Route element={<PrivateGuard />}>
            <Route path="/api/*" element={<PrivateRouter />} />
          </Route>
        </BrokenRouteAvoider>
        {children}
      </BrowserRouter>
    </>
  );
};
