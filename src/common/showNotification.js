export default function showNotification(text, time, actionText, callback) {
  const snackbar = document.querySelector("#snackbar");
  const notificationData = {
    message: text,
    actionHandler: () => {
      callback && callback();
      snackbar.MaterialSnackbar.hideSnackbar();
    },
    actionText: actionText || "DISMISS",
    timeout: time || 2500
  };
  if (snackbar.MaterialSnackbar) {
    snackbar.MaterialSnackbar.showSnackbar(notificationData);
  }
}
