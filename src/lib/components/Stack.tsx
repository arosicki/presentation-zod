import cx from "$lib/utils/cx";
import $ from "./Stack.module.scss";

type Props = React.PropsWithChildren<{
  fill?: boolean;
  vertical?: boolean;
  centered?: boolean;
  bg?: boolean;
  style?: React.CSSProperties;
}>;

export default function Stack({
  children,
  fill,
  vertical,
  centered,
  bg,
  style,
}: Props) {
  return (
    <div
      className={cx(
        $.stack,
        fill && $.isFill,
        centered && $.isCentered,
        vertical && $.isVertical,
        bg && $.hasBg
      )}
      style={style}
    >
      {children}
    </div>
  );
}
