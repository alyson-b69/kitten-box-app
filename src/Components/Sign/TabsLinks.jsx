import React from 'react';

export default function TabsLinks({activeTab, displaySignIn, displaySignUp}) {
    return (
        <ul>
            <li><a href="#" title="" className={"tab-link "+ (activeTab === 'sign-in' ? 'active':'')} id="sign-in" onClick={displaySignIn}>Sign in</a></li>
            <li><a href="#" title="" className={"tab-link "+ (activeTab === 'sign-up' ? 'active':'')} id="sign-up" onClick={displaySignUp}>Sign-up</a></li>
        </ul>
    )
}
