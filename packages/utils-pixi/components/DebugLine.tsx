import { Graphics } from "@pixi/react";
import { ISize } from "pixi.js";
import React from "react";

type Props = { size: ISize; color: string };

export default function DebugLine({ size, color = "black" }: Props) {
  return (
    <Graphics
      draw={(g) => {
        g.lineStyle(3, color);
        g.drawRect(-size.width / 2, -size.height / 2, size.width, size.height);
      }}
    />
  );
}
