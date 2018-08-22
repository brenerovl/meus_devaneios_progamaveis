#include <stdio.h>
#include <math.h>
#include <iostream>

using namespace std;



int main(){
	int ci, li, ck, lk;
	
	cout << "Numero de linhas da primeira matriz: \n";
	cin >> li;
	cout << "Numero de colunas da primeira matriz: \n";
	cin >> ci;
	cout << "Numero de linhas da segunda matriz: \n";
	cin >> lk;
	cout << "Numero de colunas da segunda matriz: \n";
	cin >> ck;
	
	double matriz1[li][ci], matriz2[lk][ck], matrizResp[li][ck];
	if(ci == lk){
		cout << "Entre com a primeira matriz:\n";
	
		for( int x = 0 ; x < li ; x++){
			for( int y = 0 ; y < ci ; y++){
			   	cin >> matriz1[x][y];
			}
		
		}
		cout << "Entre com a segunda matriz: \n";
	
		for( int x = 0 ; x < lk ; x++){
			for( int y = 0 ; y < ck ; y++){
			   	cin >> matriz2[x][y];
			}
		
		}
	
		int i = 0, k = 0;
		double S = 0;
	
		while( i < li ){
			for( int j = 0 ; j < lk ; j++){
				S += (matriz1[i][j]*matriz2[j][k]);
			}
			matrizResp[i][k] = S;
			S = 0;
		   	k++;
		   	if( k == ck ){
				i++;
			   	k = 0;
		   	}
		}
		cout << "Resposta: \n";
		for( int x = 0 ; x < li ; x++){
			for( int y = 0 ; y < ck ; y++){
			   	cout << matrizResp[x][y] << " ";
			}
		   	cout << endl;
		}
	}
	else{
		cout << "Nao e possivel fazer a multiplicacao.\n";
	}
	
	return 0;
}
/*
1
3
3
3
0.3 0.2 0.5
0.8 0.1 0.1
0.1 0.7 0.2
0 0.1 0.9

*/