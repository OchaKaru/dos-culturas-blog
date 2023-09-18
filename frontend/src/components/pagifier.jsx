import * as React from 'react';
import Page from './page';

export default class Pagifier extends React.Component {
    constructor(props) {
        super(props);

        let page_list = this.pagify_data(props.data);

        this.change_page = this.change_page.bind(this);
        this.move_left = this.move_left.bind(this);
        this.move_right = this.move_right.bind(this);

        this.state = {
            'number_of_pages': page_list.length,
            'current_page': 0,
            'page_list': page_list,
            'page_button_list': this.page_buttons(page_list.length),
            'left_arrow': <button onClick={this.move_left} >{'<'}</button>,
            'right_arrow': <button onClick={this.move_right} >{'>'}</button>,
        };
    }

    /*
        receives a list of objects containing: image, name, description, steps
        steps is not necessary here
    */
    pagify_data(data) {
        let page_list = [];

        let page_size = 9;
        for(let i = 0; i < data.length; i += page_size) {
            const chunk = data.slice(i, i + page_size);
            page_list.push(<Page key={i} data={chunk} />);
        }

        return page_list;
    }

    page_buttons(length) {
        let button_list = [];

        for(let i = 0; i < length; i++)
            button_list.push(<button onClick={() => this.change_page(i)} >{i + 1}</button>); // just set the button as active here when we reach the page

        return button_list;
    }

    change_page(page_number) {
        let current_page = page_number;

        if(current_page <= 0)
            current_page = 0;
        if(current_page >= this.state.number_of_pages - 1)
            current_page = this.state.number_of_pages - 1;

        this.setState({'current_page': current_page});            
    }

    move_left() {
        this.change_page(this.state.current_page - 1)
    }

    move_right() {
        this.change_page(this.state.current_page + 1)
    }

    render() {
        // change_page(0);

        return (
            <div>
                <div className='page-container'>
                    {this.state.page_list[this.state.current_page]}
                </div>
                <div className='page-button-container'>
                    {this.state.left_arrow}
                    {this.state.page_button_list}
                    {this.state.right_arrow}
                </div>
            </div>
        );
    }
}