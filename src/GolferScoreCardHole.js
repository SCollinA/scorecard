import React from 'react'
import { Route, Link } from 'react-router-dom'
import GolfIncrementShots from './GolfIncrementShots'
import GolfDecrementShots from './GolfDecrementShots'
import GolfIncrementPar from './GolfIncrementPar'
import GolfDecrementPar from './GolfDecrementPar'

export default function GolferScoreCardHole({phs, playerScore, location, updateCurrentHole, updateCurrentHoleScore, hole}) {
    return (
        <div className='GolferScoreCardHole'>
            <Link to={location.pathname.includes(hole.id) ?
                `${location.pathname.replace(`${hole.id}/`, '')}` :
                `${location.pathname}${hole.id}/`}>
                <h6>{hole.number}</h6>
            </Link>
            <div className='scoreCardHolePar'>
                <Route path={`/:path?(.*editPar.*)${hole.id}`} 
                render={() => <GolfDecrementPar updateCurrentHole={updateCurrentHole} hole={hole} />}/>
                <h6>{hole.par}</h6>
                <Route path={`/:path?(.*editPar.*)${hole.id}`} 
                render={() => <GolfIncrementPar updateCurrentHole={updateCurrentHole} hole={hole} />}/>
            </div>
            <div className='scoreCardPlayerHoleShots'>
                <Route path={`/:path?(.*editShots.*)${hole.id}`} 
                render={() => <GolfDecrementShots updateCurrentHoleScore={updateCurrentHoleScore} phs={phs} />}/>
                <h6>{phs.shots}</h6>
                <Route path={`/:path?(.*editShots.*)${hole.id}`} 
                render={() => <GolfIncrementShots updateCurrentHoleScore={updateCurrentHoleScore} phs={phs} />}/>
                </div>
            <h6>{playerScore}</h6>
        </div>
    )
}