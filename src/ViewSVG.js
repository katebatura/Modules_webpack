export class ViewSVG {
    constructor(root) {
        this.root = root;
        this.container = null;
        this.svgSpace = null;
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
            this.svgSpace = document.createElementNS('http://www.w3.org/2000/svg','svg'); // создаем SVG
            this.clock = document.createElementNS("http://www.w3.org/2000/svg",'circle');//создаем часы
            this.electrClock = document.createElementNS("http://www.w3.org/2000/svg",'text');//электронные часы    
            this.hourArrow = document.createElementNS("http://www.w3.org/2000/svg",'line');//стрелка часов      
            this.minuteArrow = document.createElementNS("http://www.w3.org/2000/svg",'line');//минутная стрелка          
            this.secondArrow = document.createElementNS("http://www.w3.org/2000/svg",'line');//секундная стрелка
            
            this.container.style.width = '30%';
            this.container.style.float = 'left';

            this.svgSpace.setAttribute('width','200');
            this.svgSpace.setAttribute('height','200');

            //стили часов
            this.clock.setAttribute('cx','100');
            this.clock.setAttribute('cy','100');
            this.clock.setAttribute('r','100');
            this.clock.setAttribute('fill','rgb(252, 202, 102)');  

            //стили электронных часов
            this.electrClock.setAttribute('x','65');
            this.electrClock.setAttribute('y','70');
            this.electrClock.setAttribute('style','font-size:21px');

            this.svgSpace.appendChild(this.clock);
            this.svgSpace.appendChild(this.electrClock);

                            
            for (let i = 1, n = 30; i < 13; i++, n+=30) {
                const number = document.createElementNS("http://www.w3.org/2000/svg",'circle'),//создаем круги с цифрами
                    numberContent = document.createElementNS("http://www.w3.org/2000/svg",'text');//создаем текст, содержащий цифры в кругах
                    
                
                numberContent.textContent = i;

                var cx = 100 + (80 * Math.sin(n * Math.PI / 180)),
                    cy = 100 - (80 * Math.cos(n * Math.PI / 180));     
                
                //расставляем круги по окружности часов
                number.setAttribute('r','14');
                number.setAttribute('fill','#48b382');
                number.setAttribute('cx', cx);
                number.setAttribute('cy', cy);

                //расставляем цифры в кругах
                if (i > 9) {            
                    numberContent.setAttribute('x', cx - 8);
                } else {
                    numberContent.setAttribute('x', cx - 4);
                }
                        
                numberContent.setAttribute('y', cy + 5);

                
                this.svgSpace.appendChild(number);   
                this.svgSpace.appendChild(numberContent);       
            }    

            

            //стилизуем стрелки
            this.hourArrow.setAttribute('x1','100');
            this.hourArrow.setAttribute('y1','100');
            this.hourArrow.setAttribute('x2','100');
            this.hourArrow.setAttribute('y2','50');
            this.hourArrow.setAttribute('stroke','black');
            this.hourArrow.setAttribute('stroke-width','6');
            this.hourArrow.setAttribute('stroke-opacity','.8');
            this.hourArrow.setAttribute('stroke-linecap','round');

            this.svgSpace.appendChild(this.hourArrow);
            
            
            this.minuteArrow.setAttribute('x1','100');
            this.minuteArrow.setAttribute('y1','100');
            this.minuteArrow.setAttribute('x2','100');
            this.minuteArrow.setAttribute('y2','40');
            this.minuteArrow.setAttribute('stroke','black');
            this.minuteArrow.setAttribute('stroke-width','4');
            this.minuteArrow.setAttribute('stroke-opacity','.8');
            this.minuteArrow.setAttribute('stroke-linecap','round');

            this.svgSpace.appendChild(this.minuteArrow);
            
            
            this.secondArrow.setAttribute('x1','100');
            this.secondArrow.setAttribute('y1','100');
            this.secondArrow.setAttribute('x2','100');
            this.secondArrow.setAttribute('y2','20');
            this.secondArrow.setAttribute('stroke','black');
            this.secondArrow.setAttribute('stroke-width','2');
            this.secondArrow.setAttribute('stroke-opacity','.8');
            this.secondArrow.setAttribute('stroke-linecap','round');

            this.svgSpace.appendChild(this.secondArrow);

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
            this.container.appendChild(this.svgSpace);
            this.root.appendChild(this.container);
        }
        

        // и обновляет время по данным из модели
        this.electrClock.textContent = model.time;

        
        //приводим стрелки в движение
        this.hourArrow.style.transformOrigin = '50% 100px';
        let a = model.date.getHours() * 30 + model.date.getMinutes() * .5;
        this.hourArrow.style.transform = `rotate(${a}deg)`;
        
        this.minuteArrow.style.transformOrigin = '50% 100px';
        this.minuteArrow.style.transform = `rotate(${model.date.getMinutes()*6}deg)`;
        
        this.secondArrow.style.transformOrigin = '50% 100px';
        this.secondArrow.style.transform = `rotate(${model.date.getSeconds()*6}deg)`;
    }

    setChangeHandler(handler) {
        this.checkedChangeHandler = handler;
    }
}