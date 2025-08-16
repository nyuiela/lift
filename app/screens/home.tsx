import { ReactNode } from "react";
import { Button, Icon } from "./DemoComponents";

type HomeProps = {
  setActiveTab: (tab: string) => void;
};
type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
export function Card({
  title,
  children,
  className = "",
  onClick,
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-[var(--app-card-bg)] backdrop-blur-sm rounded-xl shadow-sm border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-lg ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}




export function Home({ }: HomeProps) {
  return (
    <div className="space-y-6 animate-fade-in w-full h-screen flex flex-1 justify-center items-center bg-red-00 fixed right-0 top-0 p-4">

      <Card title="" className="bg-green-300 h-40 w-full">
        {/* <p className="text-[var(--app-foreground-muted)] mb-4">
          This is a minimalistic Mini App built with OnchainKit components.
        </p> */}

      </Card>


    </div>
  );
}
