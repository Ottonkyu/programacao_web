function transporMatriz(A) {
    console.log("Matriz original:");
    A.forEach(linha => console.log(linha));
    
    const matrizTransposta = A[0].map((_, colIndex) => A.map(row => row[colIndex]));
    
    console.log("\nMatriz transposta:");
    matrizTransposta.forEach(linha => console.log(linha));
}
const A = [
    [1, 2],
    [3, 4],
    [5, 6]
];
transporMatriz(A);
