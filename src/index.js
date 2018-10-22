
        import {Model} from "./Model.js";
        import {ViewDOM} from "./ViewDOM.js";
        import {ViewSVG} from "./ViewSVG.js";
        import {Controller} from "./Controller.js";
        
        const model1 = new Model(-5);
        const view1 = new ViewDOM(document.body);
        new Controller(model1, view1);

        const model2 = new Model(0);
        const view2 = new ViewDOM(document.body);
        new Controller(model2, view2);
        
        const model3 = new Model(1);
        const view3 = new ViewDOM(document.body);
        new Controller(model3, view3);

        
        const model4 = new Model(3);
        const view4 = new ViewSVG(document.body);
        new Controller(model4, view4);

        const model5 = new Model(9);
        const view5 = new ViewSVG(document.body);
        new Controller(model5, view5);
        
        const model6 = new Model(10);
        const view6 = new ViewSVG(document.body);
        new Controller(model6, view6);