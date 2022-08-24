#include <stdio.h>
int main() {
  int arr1[100], arr2[100],n1=4,n2=5,n3,arr3[100];

  for (int i = 0; i < n1; i++)
  {
    scanf("%d", &arr1[i]);
    arr3[i] = arr1[i];
  }
  n3 = n1+n2;
  for (int i = 0,j = n1; i < n2,j<n3; i++,j++)
  {
    scanf("%d", &arr2[i]);
    arr3[j] = arr2[i];
  }

  for (int i = 0; i < n3; i++)
  {
    printf("%d ",arr3[i]);
  }
  
  
}

