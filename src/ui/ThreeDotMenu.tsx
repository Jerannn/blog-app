import Tippy from "@tippyjs/react";

type ThreeDotMenu = {
  renderContent: () => React.ReactNode;
  children: React.ReactElement;
};

export default function ThreeDotMenu({
  renderContent,
  children,
}: ThreeDotMenu) {
  return (
    <Tippy
      content={
        <div className="flex flex-col gap-2 bg-slate-200 rounded-lg p-2 text-slate-700 font-semibold">
          {renderContent()}
        </div>
      }
      interactive={true}
      trigger="click"
      placement="bottom"
    >
      {children}
    </Tippy>
  );
}
