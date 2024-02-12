var 

L_GDP,
GDP_GAP,
L_GDP_BAR,
G_Y_BAR

;


varexo 

E_GDP_GAP,
E_L_GDP_BAR,
E_G_Y_BAR

;


parameters 
ALPHA1, ALPHA2, G; 
ALPHA1 = 0.7;
ALPHA2 = 0.9;
G = 2.3;


model;

L_GDP = GDP_GAP + L_GDP_BAR;

GDP_GAP = ALPHA1*GDP_GAP(-1) + E_GDP_GAP;

L_GDP_BAR = L_GDP_BAR(-1) + G_Y_BAR/4 - G/4 + E_L_GDP_BAR;

G_Y_BAR = ALPHA2*G_Y_BAR(-1) + (1-ALPHA2)*G + E_G_Y_BAR;

end;



shocks;


var E_GDP_GAP; stderr 1.8;
var E_L_GDP_BAR; stderr 1.2;
var E_G_Y_BAR; stderr 0.2;

end;



steady_state_model;

L_GDP = 1; 
L_GDP_BAR = 1;
GDP_GAP = 0;
G_Y_BAR = G;

end;


// steady(nocheck);
 

stoch_simul(order=1, irf=80, nograph);


varobs L_GDP;

calib_smoother(datafile='gdp.csv', diffuse_filter);