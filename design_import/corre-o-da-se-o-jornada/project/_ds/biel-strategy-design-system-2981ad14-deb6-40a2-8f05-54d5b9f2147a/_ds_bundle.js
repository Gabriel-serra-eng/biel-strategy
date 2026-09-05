/* @ds-bundle: {"format":4,"namespace":"BielStrategyDesignSystem_2981ad","components":[{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Callout","sourcePath":"components/core/Callout.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Quote","sourcePath":"components/core/Quote.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"SlideProgress","sourcePath":"components/navigation/SlideProgress.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"MetricCard","sourcePath":"components/proposal/MetricCard.jsx"},{"name":"PhaseStep","sourcePath":"components/proposal/PhaseStep.jsx"},{"name":"PricingTier","sourcePath":"components/proposal/PricingTier.jsx"},{"name":"Stat","sourcePath":"components/proposal/Stat.jsx"},{"name":"ValueFigure","sourcePath":"components/proposal/ValueFigure.jsx"}],"sourceHashes":{"components/brand/Wordmark.jsx":"28ad1f3c2571","components/core/Badge.jsx":"022f69a05bf9","components/core/Button.jsx":"c77153869399","components/core/Callout.jsx":"152703d44166","components/core/Card.jsx":"3eeec94d0f14","components/core/IconButton.jsx":"3fff8d50227d","components/core/Quote.jsx":"68c5d8dddd32","components/core/Tag.jsx":"64e090e7c597","components/feedback/Dialog.jsx":"4cb69492fb91","components/feedback/Toast.jsx":"6fd50ee7fc9c","components/feedback/Tooltip.jsx":"fbe4867bcb71","components/forms/Checkbox.jsx":"36da8e87154d","components/forms/Input.jsx":"e329bd035655","components/forms/Radio.jsx":"ef1de94da8f6","components/forms/Select.jsx":"31fff4612578","components/forms/Switch.jsx":"aa4cd12653af","components/navigation/SlideProgress.jsx":"eca45e93b0a1","components/navigation/Tabs.jsx":"a958d441cd11","components/proposal/MetricCard.jsx":"8d6a29ddd89f","components/proposal/PhaseStep.jsx":"02e01bd4b6a2","components/proposal/PricingTier.jsx":"654830a9758e","components/proposal/Stat.jsx":"816758c5dec6","components/proposal/ValueFigure.jsx":"afb92e9b5355","ui_kits/proposta-web/proposta.js":"b271ebd257d1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BielStrategyDesignSystem_2981ad = window.BielStrategyDesignSystem_2981ad || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Wordmark({
  size = 16,
  tone = "light",
  accentWord = true,
  style,
  ...rest
}) {
  const fg = tone === "accent" ? "var(--carmesim-500)" : tone === "muted" ? "var(--text-muted)" : "var(--white)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4em",
      font: `var(--weight-bold) ${size}px/1 var(--font-sans)`,
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: fg,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, "BIEL"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: accentWord ? "var(--carmesim-500)" : "inherit"
    }
  }, "STRATEGY"));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  tone = "neutral",
  children,
  style,
  ...rest
}) {
  const t = {
    neutral: {
      bg: "var(--surface-hover)",
      fg: "var(--text-body)",
      bd: "var(--border-muted)"
    },
    accent: {
      bg: "var(--carmesim-tint)",
      fg: "var(--carmesim-400)",
      bd: "var(--carmesim-600)"
    },
    solid: {
      bg: "var(--carmesim-500)",
      fg: "var(--white)",
      bd: "transparent"
    },
    outline: {
      bg: "transparent",
      fg: "var(--text-muted)",
      bd: "var(--border-muted)"
    }
  }[tone] || {
    bg: "var(--surface-hover)",
    fg: "var(--text-body)",
    bd: "var(--border-muted)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 24,
      padding: "0 10px",
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      font: "var(--weight-bold) var(--size-label)/1 var(--font-sans)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      borderRadius: "var(--radius-xs)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  primary: {
    bg: "var(--fill-accent)",
    fg: "var(--white)",
    bd: "transparent",
    hov: "var(--fill-accent-hover)",
    act: "var(--fill-accent-press)"
  },
  outline: {
    bg: "transparent",
    fg: "var(--white)",
    bd: "var(--carmesim-500)",
    hov: "var(--carmesim-tint)",
    act: "rgba(226,29,72,.2)"
  },
  invert: {
    bg: "var(--fill-invert)",
    fg: "var(--black-900)",
    bd: "transparent",
    hov: "var(--fill-invert-hover)",
    act: "var(--fill-invert-press)"
  },
  ghost: {
    bg: "transparent",
    fg: "var(--text-body)",
    bd: "transparent",
    hov: "var(--surface-hover)",
    act: "var(--surface-press)"
  }
};
const S = {
  sm: {
    h: "var(--control-h-sm)",
    px: "16px",
    fs: "12px"
  },
  md: {
    h: "var(--control-h-md)",
    px: "26px",
    fs: "13px"
  },
  lg: {
    h: "var(--control-h-lg)",
    px: "38px",
    fs: "14px"
  }
};
function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  style,
  ...rest
}) {
  const v = V[variant] || V.primary,
    s = S[size] || S.md;
  const [h, setH] = React.useState(false),
    [a, setA] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setA(false);
    },
    onMouseDown: () => setA(true),
    onMouseUp: () => setA(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      height: s.h,
      padding: `0 ${s.px}`,
      width: fullWidth ? "100%" : "auto",
      font: `var(--weight-bold) ${s.fs}/1 var(--font-sans)`,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: v.fg,
      background: disabled ? "var(--surface-hover)" : a ? v.act : h ? v.hov : v.bg,
      border: `1px solid ${disabled ? "var(--border-hairline)" : v.bd}`,
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      transition: "var(--transition-control)",
      transform: a && !disabled ? "translateY(1px)" : "none",
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Callout({
  tone = "accent",
  title,
  children,
  style,
  ...rest
}) {
  const barLeft = tone !== "top";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      borderLeft: barLeft ? "3px solid var(--carmesim-500)" : "none",
      borderTop: barLeft ? "none" : "2px solid var(--carmesim-500)",
      padding: "var(--space-6)",
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--weight-bold) var(--size-h4)/1.3 var(--font-display)",
      color: "var(--text-strong)",
      marginBottom: "var(--space-3)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      maxWidth: "var(--measure)"
    }
  }, children));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Callout.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  tone = "default",
  padding = "var(--gutter-card)",
  topRule = false,
  interactive = false,
  children,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const tones = {
    default: {
      bg: "var(--surface-card)",
      bd: "var(--border-hairline)"
    },
    subtle: {
      bg: "var(--surface-subtle)",
      bd: "var(--border-hairline)"
    },
    raised: {
      bg: "var(--surface-raised)",
      bd: "var(--border-muted)"
    },
    outline: {
      bg: "transparent",
      bd: "var(--border-muted)"
    },
    accent: {
      bg: "var(--carmesim-tint)",
      bd: "var(--carmesim-600)"
    }
  };
  const t = tones[tone] || tones.default;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: t.bg,
      color: "var(--text-body)",
      border: `1px solid ${t.bd}`,
      borderTop: topRule ? "2px solid var(--carmesim-500)" : `1px solid ${t.bd}`,
      borderRadius: "var(--radius-card)",
      padding,
      boxShadow: interactive && h ? "var(--shadow-raised)" : "none",
      transform: interactive && h ? "translateY(-2px)" : "none",
      transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-standard)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  size = "md",
  variant = "ghost",
  label,
  disabled = false,
  children,
  style,
  ...rest
}) {
  const d = size === "sm" ? 34 : size === "lg" ? 54 : 44;
  const [h, setH] = React.useState(false);
  const solid = variant === "solid";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: d,
      height: d,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: solid ? "var(--white)" : h ? "var(--white)" : "var(--text-body)",
      background: solid ? h ? "var(--fill-accent-hover)" : "var(--fill-accent)" : h ? "var(--surface-hover)" : "transparent",
      border: variant === "outline" ? "1px solid var(--border-muted)" : "1px solid transparent",
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Quote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Quote({
  children,
  author,
  align = "left",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("blockquote", _extends({
    style: {
      margin: 0,
      display: "flex",
      gap: "var(--space-5)",
      justifyContent: align === "center" ? "center" : "flex-start",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 3,
      alignSelf: "stretch",
      background: "var(--carmesim-500)",
      flex: "0 0 3px"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "italic var(--weight-medium) var(--size-h3)/1.5 var(--font-sans)",
      color: "var(--text-strong)",
      maxWidth: "var(--measure)"
    }
  }, children), author && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      font: "var(--type-kicker)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, author)));
}
Object.assign(__ds_scope, { Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Quote.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  onRemove,
  selected = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 32,
      padding: "0 14px",
      background: selected ? "var(--carmesim-500)" : "transparent",
      color: selected ? "var(--white)" : "var(--text-body)",
      border: `1px solid ${selected ? "var(--carmesim-500)" : "var(--border-muted)"}`,
      borderRadius: "var(--radius-pill)",
      font: "var(--weight-medium) var(--size-body-sm)/1 var(--font-sans)",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remover",
    style: {
      border: 0,
      background: "none",
      cursor: "pointer",
      color: "inherit",
      font: "inherit",
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = true,
  title,
  description,
  onClose,
  footer,
  children,
  width = 520,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: "var(--space-5)",
      background: "var(--overlay-scrim)",
      backdropFilter: "var(--veil-blur)"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-muted)",
      borderRadius: "var(--radius-modal)",
      boxShadow: "var(--shadow-modal)",
      padding: "var(--space-7)",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--weight-bold) var(--size-h2)/var(--lh-heading) var(--font-display)",
      margin: 0
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: "var(--space-3) 0 0",
      maxWidth: "var(--measure)"
    }
  }, description), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-5)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-7)",
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--space-3)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  tone = "neutral",
  title,
  children,
  onClose,
  style,
  ...rest
}) {
  const bar = tone === "accent" ? "var(--carmesim-500)" : "var(--border-strong)";
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "flex-start",
      minWidth: 300,
      maxWidth: 420,
      background: "var(--surface-raised)",
      color: "var(--text-body)",
      border: "1px solid var(--border-muted)",
      borderLeft: `3px solid ${bar}`,
      borderRadius: "var(--radius-xs)",
      padding: "var(--space-4) var(--space-5)",
      boxShadow: "var(--shadow-raised)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--weight-semibold) var(--size-body-sm)/1.3 var(--font-sans)",
      color: "var(--text-strong)"
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--weight-regular) var(--size-caption)/1.5 var(--font-sans)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      background: "none",
      border: 0,
      color: "var(--text-muted)",
      cursor: "pointer",
      fontSize: "14px"
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  placement = "top",
  children,
  style
}) {
  const [on, setOn] = React.useState(false);
  const pos = placement === "bottom" ? {
    top: "calc(100% + 10px)"
  } : {
    bottom: "calc(100% + 10px)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false),
    onFocus: () => setOn(true),
    onBlur: () => setOn(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      ...pos,
      opacity: on ? 1 : 0,
      pointerEvents: "none",
      transition: "opacity var(--dur-fast) var(--ease-standard)",
      background: "var(--black-950)",
      border: "1px solid var(--border-muted)",
      color: "var(--text-strong)",
      padding: "7px 10px",
      borderRadius: "var(--radius-xs)",
      font: "var(--weight-regular) var(--size-caption)/1.2 var(--font-sans)",
      whiteSpace: "nowrap"
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  const [i, setI] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : i;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "flex-start",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: on,
    disabled: disabled,
    onChange: e => {
      setI(e.target.checked);
      onChange && onChange(e);
    },
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      flex: "0 0 20px",
      marginTop: 2,
      display: "grid",
      placeItems: "center",
      background: on ? "var(--carmesim-500)" : "transparent",
      border: `1px solid ${on ? "var(--carmesim-500)" : "var(--border-muted)"}`,
      borderRadius: "var(--radius-xs)",
      color: "var(--white)",
      font: "700 12px/1 var(--font-sans)",
      transition: "var(--transition-control)"
    }
  }, on ? "✓" : ""), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  prefix,
  size = "md",
  style,
  ...rest
}) {
  const [fc, setFc] = React.useState(false);
  const h = size === "sm" ? "var(--control-h-sm)" : size === "lg" ? "var(--control-h-lg)" : "var(--control-h-md)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-kicker)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: h,
      padding: "0 14px",
      background: "var(--surface-card)",
      border: `1px solid ${error ? "var(--carmesim-500)" : fc ? "var(--carmesim-500)" : "var(--border-muted)"}`,
      borderRadius: "var(--radius-control)",
      boxShadow: fc ? "0 0 0 3px var(--carmesim-tint)" : "none",
      transition: "var(--transition-control)"
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "flex"
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFc(true),
    onBlur: () => setFc(false),
    style: {
      flex: 1,
      border: 0,
      outline: "none",
      background: "transparent",
      font: "var(--type-body)",
      color: "var(--text-strong)",
      minWidth: 0
    }
  }, rest))), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-regular) var(--size-caption)/1.4 var(--font-sans)",
      color: error ? "var(--carmesim-400)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-pill)",
      display: "grid",
      placeItems: "center",
      border: `1px solid ${checked ? "var(--carmesim-500)" : "var(--border-muted)"}`,
      transition: "var(--transition-control)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--carmesim-500)" : "transparent"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  hint,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-kicker)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    style: {
      appearance: "none",
      width: "100%",
      height: "var(--control-h-md)",
      padding: "0 38px 0 14px",
      background: "var(--surface-card)",
      border: "1px solid var(--border-muted)",
      borderRadius: "var(--radius-control)",
      font: "var(--type-body)",
      color: "var(--text-strong)",
      cursor: "pointer"
    }
  }, rest), options.map(o => {
    const v = typeof o === "string" ? o : o.value,
      l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v,
      style: {
        background: "var(--black-800)"
      }
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--carmesim-500)",
      fontSize: "11px"
    }
  }, "\u25BC")), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-regular) var(--size-caption)/1.4 var(--font-sans)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  const [i, setI] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : i;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: on,
    disabled: disabled,
    onChange: e => {
      setI(e.target.checked);
      onChange && onChange(e);
    },
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 42,
      height: 24,
      borderRadius: "var(--radius-pill)",
      padding: 2,
      display: "flex",
      background: on ? "var(--carmesim-500)" : "var(--surface-press)",
      transition: "background-color var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-pill)",
      background: "var(--white)",
      transform: on ? "translateX(18px)" : "none",
      transition: "transform var(--dur-base) var(--ease-out)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SlideProgress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SlideProgress({
  total = 10,
  current = 1,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      ...style
    }
  }, rest), Array.from({
    length: total
  }, (_, i) => i + 1).map(n => {
    const on = n === current;
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      "aria-label": `Ir para o slide ${n}`,
      "aria-current": on ? "true" : undefined,
      onClick: () => onSelect && onSelect(n),
      style: {
        width: on ? 26 : 8,
        height: 2,
        padding: 0,
        border: 0,
        cursor: "pointer",
        background: on ? "var(--carmesim-500)" : "var(--border-strong)",
        transition: "width var(--dur-base) var(--ease-out), background-color var(--dur-base) var(--ease-standard)"
      }
    });
  }));
}
Object.assign(__ds_scope, { SlideProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SlideProgress.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  style
}) {
  const [i, setI] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const active = value !== undefined ? value : i;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--space-6)",
      borderBottom: "1px solid var(--border-hairline)",
      ...style
    }
  }, items.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => {
        setI(t.value);
        onChange && onChange(t.value);
      },
      style: {
        border: 0,
        background: "none",
        padding: "0 0 14px",
        cursor: "pointer",
        position: "relative",
        font: "var(--weight-bold) 12px/1 var(--font-sans)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        color: on ? "var(--text-strong)" : "var(--text-muted)",
        transition: "var(--transition-control)"
      }
    }, t.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        background: on ? "var(--carmesim-500)" : "transparent"
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/proposal/MetricCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MetricCard({
  term,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      padding: "var(--space-6)",
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--weight-bold) var(--size-h4)/1.2 var(--font-display)",
      color: "var(--carmesim-500)",
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    }
  }, term), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      font: "var(--weight-regular) var(--size-body-sm)/1.7 var(--font-sans)",
      color: "var(--text-muted)"
    }
  }, children));
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proposal/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/proposal/PhaseStep.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PhaseStep({
  index,
  title,
  duration,
  orientation = "vertical",
  last = false,
  children,
  style,
  ...rest
}) {
  if (orientation === "horizontal") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        flex: 1,
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "1.5px solid var(--carmesim-500)",
        background: "var(--surface-page)",
        font: "var(--weight-bold) var(--size-body-sm)/1 var(--font-sans)",
        color: "var(--white)"
      }
    }, index), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-kicker)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        color: "var(--text-strong)",
        textAlign: "center"
      }
    }, title), children && /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--weight-regular) var(--size-caption)/1.6 var(--font-sans)",
        color: "var(--text-muted)",
        textAlign: "center"
      }
    }, children));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "var(--space-5)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-pill)",
      border: "1.5px solid var(--carmesim-500)",
      font: "var(--weight-bold) var(--size-body-sm)/1 var(--font-sans)",
      color: "var(--white)"
    }
  }, index), !last && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      width: 1,
      background: "var(--border-hairline)",
      marginTop: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: last ? 0 : "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      font: "var(--weight-bold) var(--size-h4)/1.3 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, title), duration && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-medium) var(--size-caption)/1 var(--font-sans)",
      color: "var(--carmesim-500)",
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, duration)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      font: "var(--weight-regular) var(--size-body-sm)/var(--lh-body) var(--font-sans)",
      color: "var(--text-muted)",
      maxWidth: "var(--measure)"
    }
  }, children)));
}
Object.assign(__ds_scope, { PhaseStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proposal/PhaseStep.jsx", error: String((e && e.message) || e) }); }

// components/proposal/PricingTier.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PricingTier({
  name,
  price,
  period = "/mês",
  summary,
  features = [],
  featured = false,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      padding: "var(--space-7)",
      background: featured ? "var(--surface-raised)" : "var(--surface-card)",
      color: "var(--text-body)",
      border: `1px solid ${featured ? "var(--carmesim-600)" : "var(--border-hairline)"}`,
      borderTop: featured ? "2px solid var(--carmesim-500)" : "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-kicker)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: featured ? "var(--carmesim-500)" : "var(--text-muted)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-black) var(--size-display-3)/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-medium) var(--size-body-sm)/1 var(--font-sans)",
      color: "var(--text-muted)"
    }
  }, period)), summary && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--weight-regular) var(--size-body-sm)/var(--lh-body) var(--font-sans)",
      color: "var(--text-muted)"
    }
  }, summary), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, features.map((x, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      font: "var(--weight-regular) var(--size-body-sm)/1.5 var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--carmesim-500)",
      lineHeight: 1.5
    }
  }, "\u2022"), x))), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "var(--space-4)"
    }
  }, action));
}
Object.assign(__ds_scope, { PricingTier });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proposal/PricingTier.jsx", error: String((e && e.message) || e) }); }

// components/proposal/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Stat({
  value,
  label,
  note,
  align = "left",
  accent = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--weight-black) var(--size-display-3)/1 var(--font-display)",
      color: accent ? "var(--carmesim-500)" : "var(--text-strong)",
      letterSpacing: "var(--tracking-display)"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-kicker)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginTop: 10
    }
  }, label), note && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--weight-regular) var(--size-caption)/1.6 var(--font-sans)",
      color: "var(--text-faint)",
      marginTop: 8
    }
  }, note));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proposal/Stat.jsx", error: String((e && e.message) || e) }); }

// components/proposal/ValueFigure.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ÚNICO componente autorizado a usar --verde-valor. Ver readme.md → "Regra do verde". */
function ValueFigure({
  value,
  strikethrough,
  caption,
  size = 96,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: "center",
      ...style
    }
  }, rest), strikethrough && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--weight-medium) var(--size-h3)/1.4 var(--font-sans)",
      color: "var(--text-faint)",
      textDecoration: "line-through",
      letterSpacing: "0.02em"
    }
  }, strikethrough), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      font: "var(--weight-medium) var(--size-h3)/1.4 var(--font-sans)",
      color: "var(--text-strong)",
      letterSpacing: "0.18em",
      textTransform: "uppercase"
    }
  }, caption), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      font: `var(--weight-black) ${size}px/1 var(--font-display)`,
      letterSpacing: "-0.02em",
      color: "var(--verde-valor)"
    }
  }, value));
}
Object.assign(__ds_scope, { ValueFigure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proposal/ValueFigure.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposta-web/proposta.js
try { (() => {
(() => {
  const deck = document.querySelector('.deck');
  const slides = [...document.querySelectorAll('.slide')];
  const dots = document.querySelector('.dots');
  const counter = document.querySelector('.counter b');
  const hint = document.querySelector('.hint');
  const chrome = document.querySelector('.chrome');
  slides.forEach((s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
    b.addEventListener('click', () => s.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    }));
    dots.appendChild(b);
  });
  const buttons = [...dots.children];
  const setActive = i => {
    buttons.forEach((b, n) => b.setAttribute('aria-current', n === i ? 'true' : 'false'));
    counter.textContent = String(i + 1).padStart(2, '0');
    if (hint) hint.style.opacity = i === 0 ? '1' : '0';
    if (chrome) chrome.style.opacity = i === 0 ? '0' : '1';
    try {
      localStorage.setItem('biel:proposta:slide', String(i));
    } catch (e) {}
  };
  let ioFired = false;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        ioFired = true;
        e.target.classList.add('is-in');
        if (e.intersectionRatio > 0.55) setActive(slides.indexOf(e.target));
      }
    });
  }, {
    threshold: [0.25, 0.6]
  });
  slides.forEach(s => io.observe(s));

  // rede de segurança: se o observer nunca disparar, mostra tudo
  const revealAll = () => {
    if (!ioFired) slides.forEach(s => s.classList.add('is-in'));
  };
  slides[0].classList.add('is-in');
  let guard = setTimeout(revealAll, 2500);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      clearTimeout(guard);
      guard = setTimeout(revealAll, 2500);
    }
  });

  // vídeo: toca só quando visível (economia de bateria/dados no celular)
  const video = document.querySelector('video[data-autoplay]');
  if (video) {
    const vio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        e.isIntersecting ? video.play().catch(() => {}) : video.pause();
      });
    }, {
      threshold: 0.35
    });
    vio.observe(video);
  }
  const go = dir => {
    const cur = buttons.findIndex(b => b.getAttribute('aria-current') === 'true');
    const next = Math.min(slides.length - 1, Math.max(0, cur + dir));
    slides[next].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  window.addEventListener('keydown', e => {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault();
      go(1);
    }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      go(-1);
    }
    if (e.key === 'Home') slides[0].scrollIntoView({
      behavior: 'smooth'
    });
    if (e.key === 'End') slides[slides.length - 1].scrollIntoView({
      behavior: 'smooth'
    });
  });

  // retoma onde parou
  try {
    const saved = parseInt(localStorage.getItem('biel:proposta:slide') || '0', 10);
    if (saved > 0 && saved < slides.length) {
      requestAnimationFrame(() => deck.scrollTo({
        top: slides[saved].offsetTop,
        behavior: 'auto'
      }));
    }
  } catch (e) {}
  setActive(0);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposta-web/proposta.js", error: String((e && e.message) || e) }); }

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.SlideProgress = __ds_scope.SlideProgress;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.PhaseStep = __ds_scope.PhaseStep;

__ds_ns.PricingTier = __ds_scope.PricingTier;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.ValueFigure = __ds_scope.ValueFigure;

})();
