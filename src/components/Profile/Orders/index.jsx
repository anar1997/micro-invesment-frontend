import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMeAsync } from '../../../redux/AuthSlice/AuthSlice';
import { getOrderAsync } from '../../../redux/OrderSlice/OrderSlice';
import { Pagination } from 'antd';

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  let orders = useSelector((state) => state.order.orders)
  let me = useSelector((state) => state.auth.me)
  let totalPage = useSelector((state) => state.order.totalPage)
  let pageLimit = useSelector((state) => state.order.pageLimit)

  // console.log(me); 

  console.log(orders);

  const changePage = (e) => {
    setCurrentPage(e);
    let offset = (e-1) * pageLimit
    dispatch(getOrderAsync({"owner": me ? me.id : "", "offset": offset}))
  }

  useEffect(() => {
    dispatch(getMeAsync());
    dispatch(getOrderAsync(me.id))
  }, [])

  return (
    <div className='mx-4 flex flex-col'>
      <Pagination 
         onChange={(e) => {
          changePage(e);
        }}
        className='mt-5 mb-2'
        current={currentPage}
        total={totalPage}
        defaultPageSize={pageLimit}
        showSizeChanger={false}
      />
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='border border-slate-600'>Adı</th>
            <th className='border border-slate-600'>Ümumi investisiya</th>
            <th className='border border-slate-600'>Ümumi gəlir</th>
            <th className='border border-slate-600'>Yekun mənfəət</th>
            <th className='border border-slate-600'>Yekunlaşma tarixi</th>
            <th className='border border-slate-600'>Başlama tarixi</th>
            <th className='border border-slate-600'>Bitmə tarixi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((v, i) => (
            <tr>
              <td className='border border-slate-700 pl-2'>{v.project_name}</td>
              <td className='border border-slate-700 pl-2'>{v.total_investment}</td>
              <td className='border border-slate-700 pl-2'>{v.gross_income}</td>
              <td className='border border-slate-700 pl-2'>{v.final_profit}</td>
              <td className='border border-slate-700 pl-2'>{v.finished_date}</td>
              <td className='border border-slate-700 pl-2'>{v.start_date}</td>
              <td className='border border-slate-700 pl-2'>{v.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders