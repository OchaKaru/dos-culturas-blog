import * as React from 'react';
import AllRecipeSlide from './all-recipe-slide';

import Slideshow from '../../arroz-con-webo/containment/slideshow';

export default class AllRecipeCarousel extends React.Component {
    constructor(props) {
        super(props);

        if(props.data) {
            this.MAX_RECIPES_ON_PAGE = 9

            let page_list = this.pagify_data(props.data);

            this.change_page = this.change_page.bind(this);
            this.move_left = this.move_left.bind(this);
            this.move_right = this.move_right.bind(this);

            this.state = {
                'number_of_pages': page_list.length,
                'current_page': 0,
                'page_list': page_list,
                // 'page_button_list': this.page_buttons(page_list.length),
                'left_arrow': <button onClick={this.move_left} >{'◀'}</button>,
                'right_arrow': <button onClick={this.move_right} >{'▶'}</button>,
            };
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data) {
            let page_list = this.pagify_data(this.props.data);

            this.setState({
                'number_of_pages': page_list.length,
                'current_page': 0,
                'page_list': page_list,
                'page_button_list': this.page_buttons(page_list.length)
            });
        }
    }

    /*
        receives a list of objects containing: image, name, description, steps
        steps is not necessary here
    */
    pagify_data(data) {
        let page_list = [];

        for(let i = 0; i < data.length; i += this.MAX_RECIPES_ON_PAGE) {
            const chunk = data.slice(i, i + this.MAX_RECIPES_ON_PAGE);
            page_list.push(<AllRecipeSlide key={i} data={chunk} />);
        }

        return page_list;
    }

    page_buttons(length) {
        let button_list = [];

        for(let i = 0; i < length; i++)
            button_list.push(<button 
                key={i}
                className={i === this.state.current_page ? 'active-page' : ''}  // just set the button as active here when we reach the page
                onClick={() => this.change_page(i)} >{i + 1}
            </button>);

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

    display_page() {
        if(this.state.number_of_pages === 0)
            return <></>;

        return this.state.page_list[this.state.current_page];
    }

    move_left() {
        this.change_page(this.state.current_page - 1)
    }

    move_right() {
        this.change_page(this.state.current_page + 1)
    }

    render() {
        return (
            <Slideshow className='all-recipe-carousel' enterStyle="fade-in-up" exitStyle="fade-out-against">
                {this.state.page_list}
            </Slideshow>
            // <div className='all-recipe-carousel'>
            //     {this.display_page()}
            //     <div className='page-button-container'>
            //         {this.state.left_arrow}
            //         {this.page_buttons(this.state.number_of_pages)}
            //         {this.state.right_arrow}
            //     </div>
            // </div>
        );
    }
}