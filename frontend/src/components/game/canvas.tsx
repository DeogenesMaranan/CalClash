import { ReactNode } from "react";

export default function CanvasComponent({ children }: { children: ReactNode }) {
  return <div className="h-120 w-140 border">{children}</div>;
}
