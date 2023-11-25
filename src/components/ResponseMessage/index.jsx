import React, { useEffect } from 'react'
import { notification } from 'antd';
import { useDispatch } from 'react-redux';

const ResponseMessage = (props) => {
    const dispatch = useDispatch();

    const openNotification = () => {
        if(props.type=='success'){
            notification.success({
                message: props.message,
                onClick: () => {
                    dispatch(props.slice)
                },
                placement: 'bottomRight'
            });
        }
        else if(props.type=='error'){
            notification.error({
                message: props.message,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
                placement: 'bottomRight'
            });
        }
        dispatch(props.slice)
    };

    useEffect(()=>{
        openNotification()
    }, [])
    return (
        <div></div>
    )
}

export default ResponseMessage