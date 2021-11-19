import { toast, Icon } from "@ahaui/react";

export const notifyPositive = (desc: string) =>
  toast.success(
    () => (
      <div className="u-flex u-flexGrow1">
        <div className="u-marginRightExtraSmall">
          <Icon name="checkmarkCircle" size="medium" />
        </div>
        <div className="u-flexGrow1">
          <div>{desc}</div>
        </div>
      </div>
    ),
    {},
  );
