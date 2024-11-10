import pandas as pd
productos = pd.read_csv("productos.csv")
productos["numero_serie"] = productos["numero_serie"].astype("str")
print(productos.numero_serie)
print("Escanea un código de barras:")

while True:
    try:
        # Leer la entrada del escáner
        codigo = str(input("Código leído: "))
        
        # Mostrar el código escaneado en la terminal
        print(f"Código de barras detectado: {codigo}")

        producto = dict(zip(productos.numero_serie, productos.producto))
        nombre = producto[codigo]
        print(f"Nombre detectado: {nombre}")
    except KeyboardInterrupt:
        print("\nPrograma terminado.")
        break
