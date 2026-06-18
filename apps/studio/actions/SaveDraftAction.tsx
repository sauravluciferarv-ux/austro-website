import { CheckmarkCircleIcon, EditIcon } from '@sanity/icons';
import type { DocumentActionComponent, DocumentActionsContext } from 'sanity';

/**
 * "Draft saved" status button shown next to Publish.
 * Sanity auto-saves every edit as a draft — this button surfaces that status.
 */
export const SaveDraftAction: DocumentActionComponent = (props: DocumentActionsContext) => {
  const hasDraft = Boolean(props.draft);

  return {
    label: hasDraft ? 'Draft saved' : 'No changes',
    icon: hasDraft ? CheckmarkCircleIcon : EditIcon,
    tone: hasDraft ? 'positive' : 'default',
    disabled: true,
    title: hasDraft
      ? 'Your edits are auto-saved as a draft — click Publish to make them live'
      : 'No unpublished changes',
  };
};
