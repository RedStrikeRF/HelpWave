import applications from '@shared/assets/j.svg'
import { useBehavior } from '../model'

export const ActiveApplicationsPage = () => {
  const {
    applicationList
  } = useBehavior();
  return (
    <div className="active-applications-page">
      <img src={applications} alt="active-applications-page img" className="active-applications-page__img"/>
      <div className="active-applications-page__list">
        <h2 className="active-applications-page__title">Активные заявки</h2>
        {/* {applicationList.map((else, index) => {
          
        })} */}
      </div>
    </div>
  )
}