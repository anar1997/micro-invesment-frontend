import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getEntrepreneurTableAsync } from '../../../redux/EntreprenuerTableSlice/EntrepreneurTableSlice';
import { getMeAsync } from '../../../redux/AuthSlice/AuthSlice';
import { getAllEntrepreneurAsync } from '../../../redux/EntrepreneurSlice/EntrepreneurSlice';
import { Pagination } from 'antd';

const EntreprenuerTable = () => {
  let [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  let investments = useSelector((state) => state.entrepreneurTable.investments)
  let me = useSelector((state) => state.auth.me)
  let totalPage = useSelector((state) => state.entrepreneur.totalPage)
  let pageLimit = useSelector((state) => state.entrepreneur.pageLimit)

  console.log(me);  

  const changePage = (e) => {
    setCurrentPage(e);
    let offset = (e-1) * pageLimit;
    dispatch(getAllEntrepreneurAsync({"owner": me ? me.id : "", "offset": offset}))
  }

  useEffect(() => {
    dispatch(getMeAsync());
    dispatch(getEntrepreneurTableAsync(me ? me.id : ""))
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
            <th className='border border-slate-600'>Sifariş</th>
            <th className='border border-slate-600'>Məbləğ</th>
            <th className='border border-slate-600'>Qazanc</th>
            <th className='border border-slate-600'>Yekun</th>
            <th className='border border-slate-600'>İnvest tarixi</th>
            <th className='border border-slate-600'>Sifarişin başlama tarixi</th>
            <th className='border border-slate-600'>Sifarişin bitmə tarixi</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((v, i) => (
            <tr key={"entrepreneur" + v.id}>
              <td className='border border-slate-700 pl-2'>{v.entrepreneur.project_name}</td>
              <td className='border border-slate-700 pl-2'>{v.amount}</td>
              <td className='border border-slate-700 pl-2'>{v.profit}</td>
              <td className='border border-slate-700 pl-2'>{v.final_profit}</td>
              <td className='border border-slate-700 pl-2'>{v.investment_date}</td>
              <td className='border border-slate-700 pl-2'>{v.entrepreneur.start_date}</td>
              <td className='border border-slate-700 pl-2'>{v.entrepreneur.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EntreprenuerTable