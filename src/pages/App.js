import '../App.css';
import Home from './Home';
import Dashboard from './Dashboard';
import DashboardSettings from './DashboardSettings'
import DashboardStylePreference from './DashboardStylePreference';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Pricing from './Pricing';
import OnboardingGeneralInfo from './OnboardingGeneralInfo';
import OnboardingTailorMeasurements from './OnboardingTailorMeasurements';
import OnboardingSizes from './OnboardingSizes';
import OnboardingStyle from './OnboardingStyle';
import Share from './Share'
import DashboardTailorMeasurementsSettings from './DashboardTailorMeasurementsSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/">
          <Route index element = {<Home/>}/>
          <Route path = "dashboard" element = {<Dashboard/>}/>
          <Route path = "dashboard-settings" element = {<DashboardSettings/>}/>
          <Route path = "dashboard-style-preference" element = {<DashboardStylePreference/>}/>
          <Route path = "dashboard-tailor-measurements-settings" element = {<DashboardTailorMeasurementsSettings/>}/>
          <Route path = "signin" element = {<SignIn/>}/>
          <Route path = "signup" element = {<SignUp/>}/>
          <Route path = "onboarding-general-info" element = {<OnboardingGeneralInfo/>}/>
          <Route path = "onboarding-tailor-measurements" element = {<OnboardingTailorMeasurements/>}/>
          <Route path = "onboarding-sizes" element = {<OnboardingSizes/>}/>
          <Route path = "onboarding-style" element = {<OnboardingStyle/>}/>
          <Route path = "pricing" element = {<Pricing/>}/>
          <Route path = "share" element = {<Share/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;