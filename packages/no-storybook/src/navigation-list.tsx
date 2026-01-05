import { ReactNode } from 'react';
import './navigation-list.css';

interface NavigationListItemProps {
  expandable?: boolean;
  current?: boolean;
  label: string;
  href: string;
}

interface NavigationListProps {
  header?: ReactNode;
  children?: ReactNode;
}

export function NavigationListItem(props: NavigationListItemProps) {
  return (
    <li className="ma-navigation-drawer__item ma-focus-indicator-inset">
      <a href={props.href} aria-current={props.current ? 'page' : undefined}>
        {props.label}
      </a>
    </li>
  );
}

export function NavigationList(props: NavigationListProps) {
  return (
    <ul className="ma-navigation-drawer__list" role="list">
      {props.children}
    </ul>
  );
}
