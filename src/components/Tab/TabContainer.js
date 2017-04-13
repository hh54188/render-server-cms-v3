import React from 'react'

export default class TabContainer extends React.Component {
    componentDidMount() {
        let items = document.querySelectorAll('.menu .item');
        let tabs = [].slice.call(document.querySelectorAll('.tab.segment'));

        [...items].forEach((ele) => {

            let isActive = ele.className.indexOf('active') > -1;
            let tabName = ele.getAttribute('data-tab');
            let tab = document.querySelector('.tab.segment[data-tab=' + tabName + ']');
            
            if (isActive) {
                tab.style.display = 'block';
            } else {
                tab.style.display = 'none';
            }

            ele.addEventListener('click', function() {
                tabs.forEach((tempTab) => {
                    if (tempTab.getAttribute('data-tab') === this.getAttribute('data-tab')) {
                        tempTab.style.display = 'block';
                    } else {
                        tempTab.style.display = 'none';                        
                    }
                });

                items.forEach(function (tempItem) {
                    tempItem.classList.remove('active');
                });
                this.classList.add('active');                
            });
        });
    }    
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}