export class Model {
    constructor(timezone) {
        this.localeDate = new Date();
        this.timezone = ( timezone * 60 + this.localeDate.getTimezoneOffset() ) * 60 * 1000;
        this.changeListener = null;
        // модель предоставляет поле date для чтения извне
        this.date = new Date(this.localeDate.getTime() + this.timezone);
        this.time = this.date.toLocaleTimeString();
        // модель обновляет себя
        setInterval(() => {
            this.localeDate = new Date();
            this.timezone = ( timezone * 60 + this.localeDate.getTimezoneOffset() ) * 60 * 1000;
            this.date = new Date(this.localeDate.getTime() + this.timezone);
            this.time = this.date.toLocaleTimeString();
            if (typeof (this.changeListenerCallback) === 'function') {
                // и нотифицирует слушателя путем вызова
                // его функции обратного вызова
                this.changeListenerCallback();
            }
        }, 1000);
    }

    setChangeListener(changeListener) {
        this.changeListenerCallback = changeListener;
    }
}