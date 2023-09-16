import * as React from 'react';
import Page from './page';

export default class Pagifier extends React.Component {
    constructor(props) {
        super(props)

        let page_list = this.pagify_data(props.data)

        this.state = {
            'number_of_pages': page_list.length,
            'current_page': 0,
            'page_list': page_list,
            'page_button_list': this.page_buttons(page_list.length),
            'left_arrow': <button>{'<'}</button>,
            'right_arrow': <button>{'>'}</button>,
        }
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
            page_list.push(<Page key={i} display={false} data={chunk} />);
        }

        return page_list;
    }

    page_buttons(length) {
        let button_list = [];

        for(let i = 0; i < length; i++)
            button_list.push(<button>{i + 1}</button>);

        return button_list;
    }

    change_page(page_number) {
        let current_page = page_number;
        let page_list = this.state.page_list;
        let button_list = this.state.page_button_list;

        let left_arrow = this.state.left_arrow;
        let right_arrow = this.state.right_arrow

        left_arrow.props.active = true;
        right_arrow.props.active = true;

        if(current_page <= 0) {
            current_page = 0;
            left_arrow.props.active = false;
        }
        if(current_page >= this.state.number_of_pages - 1) {
            current_page = this.state.number_of_pages - 1;
            right_arrow.props.active = false;
        }

        for(let i = 0; i < page_list.length; i++) {
            page_list[i].props.display = i === current_page ? true : false;
        }
        for(let i = 0; i < button_list.length; i++) {
            button_list[i].props.active = i === current_page ? true : false;
        }

        this.setState({
            'current_page': current_page,
            'page_list': page_list,
            'page_button_list': button_list,
            'left_arrow': left_arrow,
            'right_arrow': right_arrow
        });            
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
                    {this.state.page_list}
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

/*
<div>
    <Image>
        <Filter />
    </Image>
    <div>
        <Title />
        <Subtitle />
        <Button />
    </div>
</div>
*/