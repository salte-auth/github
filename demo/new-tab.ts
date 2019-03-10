import { Handler, SalteAuthError } from '@salte-auth/salte-auth';

export class NewTab extends Handler {
  protected defaults: Partial<Handler.Config> = {
    name: 'new-tab'
  };

  open({ url }: Handler.OpenOptions): Promise<void> {
    console.log(url);

    const tabWindow = window.open(url, '_blank');
    if (!tabWindow) {
      throw new SalteAuthError({
        message: 'We were unable to open the new tab, its likely that the request was blocked.',
        code: 'new_tab_blocked'
      });
    }

    tabWindow.name = 'salte-auth';
    tabWindow.focus();
    // TODO: Find a better way of tracking when a Window closes.
    return new Promise((resolve) => {
      const checker = setInterval(() => {
        try {
          if (!tabWindow.closed) {
            // This could throw cross-domain errors, so we need to silence them.
            if (!tabWindow.location.href.startsWith(this.config.redirectUrl)) return;

            const parsed = this.parse(tabWindow.location);

            console.log(parsed);

            tabWindow.close();
            setTimeout(() => resolve(parsed));
          }

          clearInterval(checker);
        } catch (e) {} // eslint-disable-line
      }, 100);
    });
  }
}
