import tkinter as tk
from tkinter import scrolledtext, font as tkfont
import requests

def send_to_node(event=None):
    input_text = input_entry.get().strip()  # Başında ve sonunda boşlukları temizle
    if input_text.lower() == "exit":
        root.destroy()
        return
    elif input_text.lower() == "clear":
        output_text.delete('1.0', tk.END)
    else:
        # Kullanıcının mesajını mavi renkte ekleyin
        output_text.insert(tk.END, "You: " + input_text + "\n", 'userMsg')
        
        encoded_input = input_text.encode('utf-8')
        try:
            response = requests.post('http://localhost:3000', data=encoded_input)
            if response.status_code == 200:
                output_text.insert(tk.END,response.content.decode('utf-8') + "\n")
            else:
                output_text.insert(tk.END, "Error: Response from server was not OK.\n")
        except requests.exceptions.RequestException as e:
            output_text.insert(tk.END, f"Error: Could not connect to server. {e}\n")
    output_text.see(tk.END)  # Otomatik olarak en alta kaydır
    input_entry.delete(0, tk.END)

def on_enter(e):
    send_button.config(background='darkblue', foreground='white')

def on_leave(e):
    send_button.config(background='lightblue', foreground='black')

root = tk.Tk()
root.title("Chatbot")

modern_font = tkfont.Font(family="Arial", size=12)

input_entry = tk.Entry(root, width=60, font=modern_font)
input_entry.pack()

send_button = tk.Button(root, text="Send", font=modern_font, bg='lightblue', fg='black', bd=0, relief=tk.FLAT, command=send_to_node)
send_button.pack(pady=5)

send_button.bind("<Enter>", on_enter)
send_button.bind("<Leave>", on_leave)

output_text = scrolledtext.ScrolledText(root, width=60, height=30, font=modern_font)
output_text.pack()

# Kullanıcı mesajları için mavi renk stili tanımlayın
output_text.tag_configure('userMsg', foreground='blue')

root.bind('<Return>', send_to_node)

root.mainloop()
