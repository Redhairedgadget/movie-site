import React from 'react';

import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';

const settings = () => {
    return(
        <div>
            <form action="">
                <Input />
                <Input />
                <Button btnType="Success">Apply Changes</Button>
            </form>
        </div>
    )
}

export default settings;