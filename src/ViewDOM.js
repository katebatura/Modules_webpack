export class ViewDOM {
    constructor(root) {
        this.root = root;
        this.container = null;
        this.clock = null;
        this.electrClock = null;
        this.hourArrow = null;
        this.minuteArrow = null;
        this.secondArrow = null;
        this.checkedChangeHandler = null;
    }

    render(model) {
        // представление создает dom элементы в первый раз
        if (!this.container) {
            this.container = document.createElement('div'); // создаем контейнер
            this.clock = document.createElement('div');//создаем часы
            this.electrClock = document.createElement('span');//электронные часы    
            this.hourArrow = document.createElement('div');//стрелка часов      
            this.minuteArrow = document.createElement('div');//минутная стрелка          
            this.secondArrow = document.createElement('div');//секундная стрелка
            

            this.container.style.width = '30%';
            this.container.style.float = 'left';

            //стили часов
            this.clock.style.width = '200px';
            this.clock.style.height = '200px';
            this.clock.style.display = 'inline-block';
            this.clock.style.borderRadius = '50%';
            this.clock.style.backgroundColor = 'rgb(252, 202, 102)';                    
            this.clock.style.position = 'relative';

            //стили электронных часов
            this.electrClock.style.display = 'inline-block';
            this.electrClock.style.fontSize = '21px';
            this.electrClock.style.position = 'absolute';
            this.electrClock.style.top = '45px';
            this.electrClock.style.left = '65px';

            this.clock.appendChild(this.electrClock);

            //стилизуем стрелки
            this.hourArrow.style.width = '6px';
            this.hourArrow.style.height = '50px';
            this.hourArrow.style.borderRadius = '3px';
            this.hourArrow.style.backgroundColor = 'black';
            this.hourArrow.style.opacity = '.9';
            this.hourArrow.style.position = 'absolute';
            this.hourArrow.style.top = '54px';
            this.hourArrow.style.left = '50%';
            this.hourArrow.style.zIndex = '2';
            this.clock.appendChild(this.hourArrow);

            this.minuteArrow.style.width = '4px';
            this.minuteArrow.style.height = '70px';
            this.minuteArrow.style.borderRadius = '2px';
            this.minuteArrow.style.backgroundColor = 'black';
            this.minuteArrow.style.opacity = '.8';
            this.minuteArrow.style.position = 'absolute';
            this.minuteArrow.style.top = '34px';
            this.minuteArrow.style.left = '50%';
            this.minuteArrow.style.zIndex = '3';
            this.clock.appendChild(this.minuteArrow);

            this.secondArrow.style.width = '2px';
            this.secondArrow.style.height = '90px';
            this.secondArrow.style.borderRadius = '1px';
            this.secondArrow.style.backgroundColor = 'black';
            this.secondArrow.style.opacity = '.9';
            this.secondArrow.style.position = 'absolute';
            this.secondArrow.style.top = '14px';
            this.secondArrow.style.left = '50%';
            this.secondArrow.style.zIndex = '4';
            this.clock.appendChild(this.secondArrow);


            for (let i = 1, n = 30; i < 13; i++, n+=30) {
                const number = document.createElement('div'),//создаем круги с цифрами
                    numberContent = document.createElement('span');//создаем сами цифры в кругах

                numberContent.textContent = i;

                number.style.width = '28px';
                number.style.height = '28px';
                number.style.borderRadius = '50%';
                number.style.backgroundColor = '#48b382';
                number.style.textAlign = 'center';
                number.style.lineHeight = '30px';
                number.style.position = 'absolute';
                number.style.top = '6px';
                number.style.left = '87px';
                //размещаем круги по окружности часов
                number.style.transformOrigin = '50% 94px';
                number.style.transform = `rotate(${n}deg)`;
                //выравниваем цифры в них
                numberContent.style.display = 'inline-block';
                numberContent.style.transform = `rotate(-${n}deg)`;

                number.appendChild(numberContent);
                this.clock.appendChild(number);          
            }    

            this.start = document.createElement('input');
            this.start.type = 'button';      
            this.start.value = 'start';     
            this.start.style.width = '50px';  
            this.start.style.margin = '5px';       
            this.stop = document.createElement('input');
            this.stop.type = 'button';
            this.stop.value = 'stop';
            this.stop.style.width = '50px';
            this.stop.style.margin = '5px';
            this.start.addEventListener('click',
                () => this.checkedChangeHandler(true));
            this.stop.addEventListener('click',
                () => this.checkedChangeHandler(false));

            
            this.container.appendChild(this.start);
            this.container.appendChild(this.stop);
            this.container.appendChild(document.createElement('br'));
            this.container.appendChild(this.clock);
            this.root.appendChild(this.container);
        }
        

        // и обновляет время по данным из модели
        this.electrClock.textContent = model.time;

        
        //приводим стрелки в движение
        this.hourArrow.style.transformOrigin = '50% 46px';
        let a = model.date.getHours() * 30 + model.date.getMinutes() * .5;
        this.hourArrow.style.transform = `rotate(${a}deg)`;
        
        this.minuteArrow.style.transformOrigin = '50% 66px';
        this.minuteArrow.style.transform = `rotate(${model.date.getMinutes()*6}deg)`;
        
        this.secondArrow.style.transformOrigin = '50% 86px';
        this.secondArrow.style.transform = `rotate(${model.date.getSeconds()*6}deg)`;
    }

    setChangeHandler(handler) {
        this.checkedChangeHandler = handler;
    }
}