import { useEffect, useRef, useState } from "react";
import { icons } from "../icons";

type FilterActionMenuProps = {
  onDelete: () => void;
  onMergeIntoAdvanced?: (() => void) | null;
};

export function FilterActionMenu({ onDelete, onMergeIntoAdvanced = null }: FilterActionMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="filter-action-menu-wrap" ref={menuRef}>
      <button
        className="ghost-button icon-button filter-action-trigger"
        type="button"
        aria-expanded={open}
        aria-label="筛选操作"
        onClick={() => setOpen((value) => !value)}
      >
        <icons.more size={15} />
      </button>
      {open ? (
        <div className="menu-content filter-action-menu filter-action-menu-side" role="menu">
          {onMergeIntoAdvanced ? (
            <button
              className="menu-item"
              onClick={() => {
                setOpen(false);
                onMergeIntoAdvanced();
              }}
              type="button"
              role="menuitem"
            >
              <icons.filter size={15} />
              合并到高级筛选中
            </button>
          ) : null}
          <button
            className="menu-item danger"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            type="button"
            role="menuitem"
          >
            <icons.delete size={15} />
            删除筛选
          </button>
        </div>
      ) : null}
    </div>
  );
}
