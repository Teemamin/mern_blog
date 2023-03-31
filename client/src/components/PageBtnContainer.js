import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useAppContext } from '../context/appContext';
import classes from '../styles/PageBtnContainer.module.css'


const PageBtnContainer = ({pageBtn}) => {
    const {changePage,page} = useAppContext()

    const nextPage = ()=>{

    }
  
    const prevPage = ()=>{
      
    }
  return (
    <section className={classes.btnSection}>
        <div className={classes.btnContainer}></div>
    <button className={classes.prevBtn} onClick={prevPage}>
      <HiChevronDoubleLeft />
      prev
    </button>
      <div>
        {pageBtn.map(pageNo=>(
          <button type="button" onClick={()=>changePage(pageNo)} className={pageNo === page ? `${classes.pageBtn} ${classes.active}` : classes.pageBtn} key={pageNo}>
            {pageNo}</button>)
        )}
      </div>
      
       <button className={classes.nextBtn} onClick={nextPage}>
        next
      <HiChevronDoubleRight />
      </button>
    </section>
  )
}

export default PageBtnContainer