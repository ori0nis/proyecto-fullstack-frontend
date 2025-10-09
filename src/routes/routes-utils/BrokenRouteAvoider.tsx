import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "..";

interface Props {
  children: ReactNode;
}

export const BrokenRouteAvoider = async ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};
