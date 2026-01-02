export const Mark = (props: { class?: string }) => {
  return (
    <svg
      data-component="logo-mark"
      classList={{ [props.class ?? ""]: !!props.class }}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path data-slot="logo-logo-mark-shadow" d="M4 12H10V16H4Z" fill="var(--icon-weak-base)" />
      <path data-slot="logo-logo-mark-o" d="M0 0H12V4H4V8H10V12H4V16H12V20H0Z" fill="var(--icon-strong-base)" />
    </svg>
  )
}

export const Logo = (props: { class?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 294 42"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      <g>
        {/* E */}
        <path d="M6 18H18V24H6V18Z" fill="var(--icon-weak-base)" />
        <path d="M0 6H24V12H6V18H18V24H6V30H24V36H0V6Z" fill="var(--icon-base)" />
        {/* A */}
        <path d="M36 24H48V30H36V24Z" fill="var(--icon-weak-base)" />
        <path d="M36 6H48V12H54V36H48V24H36V36H30V12H36V6ZM36 12V18H48V12H36Z" fill="var(--icon-base)" />
        {/* S */}
        <path d="M66 18H78V24H66V18Z" fill="var(--icon-weak-base)" />
        <path d="M60 6H84V12H66V18H78V24H84V36H60V30H78V24H66V18H60V6Z" fill="var(--icon-base)" />
        {/* Y */}
        <path d="M99 24H105V30H99V24Z" fill="var(--icon-weak-base)" />
        <path d="M90 6H96V18H99V24H105V18H108V6H114V18H108V24H105V36H99V24H96V18H90V6Z" fill="var(--icon-base)" />
        {/* B */}
        <path d="M126 18H138V24H126V18Z" fill="var(--icon-weak-base)" />
        <path d="M120 6H138V12H144V18H138V24H144V30H138V36H120V6ZM126 12V18H138V12H126ZM126 24V30H138V24H126Z" fill="var(--icon-strong-base)" />
        {/* A */}
        <path d="M156 24H168V30H156V24Z" fill="var(--icon-weak-base)" />
        <path d="M156 6H168V12H174V36H168V24H156V36H150V12H156V6ZM156 12V18H168V12H156Z" fill="var(--icon-strong-base)" />
        {/* N */}
        <path d="M186 18H198V24H186V18Z" fill="var(--icon-weak-base)" />
        <path d="M180 6H186V36H180Z M186 12H192V24H186Z M192 18H198V30H192Z M198 6H204V36H198Z" fill="var(--icon-strong-base)" />
        {/* A */}
        <path d="M216 24H228V30H216V24Z" fill="var(--icon-weak-base)" />
        <path d="M216 6H228V12H234V36H228V24H216V36H210V12H216V6ZM216 12V18H228V12H216Z" fill="var(--icon-strong-base)" />
        {/* N */}
        <path d="M246 18H258V24H246V18Z" fill="var(--icon-weak-base)" />
        <path d="M240 6H246V36H240Z M246 12H252V24H246Z M252 18H258V30H252Z M258 6H264V36H258Z" fill="var(--icon-strong-base)" />
        {/* A */}
        <path d="M276 24H288V30H276V24Z" fill="var(--icon-weak-base)" />
        <path d="M276 6H288V12H294V36H288V24H276V36H270V12H276V6ZM276 12V18H288V12H276Z" fill="var(--icon-strong-base)" />
      </g>
    </svg>
  )
}
