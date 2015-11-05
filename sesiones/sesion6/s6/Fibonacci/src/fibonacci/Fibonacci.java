/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fibonacci;

/**
 *
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */
public class Fibonacci extends Thread{

  int n;
  int result;
  
  public Fibonacci(int n){
    this.n = n;
  }
  
  public void run(){
    if((n == 0) || (n==1))  result =1;
    else{
      Fibonacci f1 = new Fibonacci(n-1);
      Fibonacci f2 = new Fibonacci(n-2);
      f1.start();
      f2.start();
      
      try{
        f1.join();
        f2.join();
      }catch(InterruptedException e){};
      
      result = f1.getResult() + f2.getResult();
    }
  }
  
  public int getResult(){
    return result;
  }
  /**
   * @param args the command line arguments
   */
  public static void main(String[] args) {
    Fibonacci f1 = new Fibonacci(Integer.parseInt(args[0]));
    f1.start();
    
    try{
      f1.join();
    }catch(InterruptedException e){};
    System.out.println(f1.getResult());
  }
  
}
