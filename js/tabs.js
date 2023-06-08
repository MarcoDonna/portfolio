class Tabs{
    constructor(tabNames, registerEvents){
        this.tabNames = tabNames;
    
        if(registerEvents)
            this.registerEvents();
    }

    registerEvents(){
        for(let i in this.tabNames){
            const tab = this.tabNames[i];
            $(`#show-${tab}`).on('click', () => this.show(tab));
        }
    }

    hideAll(){
        for(let i in this.tabNames){
            const tab = this.tabNames[i];
            $(`#${tab}-wrapper`).addClass('d-none');
            $(`#show-${tab}`).removeClass('active');
        }
    }

    show(tab){
        this.hideAll();
        $(`#${tab}-wrapper`).removeClass('d-none');
        $(`#show-${tab}`).addClass('active');
    }
}