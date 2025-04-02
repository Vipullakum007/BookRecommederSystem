from flask import Flask, render_template,request
import pickle
import numpy as np

popular_df = pickle.load(open('popular_df.pkl', 'rb'))
pt = pickle.load(open('pt.pkl', 'rb'))
similarity_score = pickle.load(open('similarity_score.pkl', 'rb'))
books = pickle.load(open('books.pkl', 'rb'))

app = Flask(__name__)

@app.route('/')
def hello():
    # print(popular_df.columns)
    return render_template('index.html' ,
                           book_name = list(popular_df['Book-Title'].values),
                            author = list(popular_df['Book-Author'].values),
                            image = list(popular_df['Image-URL-M'].values),
                            votes = list(popular_df['num_ratings'].values),
                            rating = list(popular_df['avg_rating'].values),
                           )

@app.route('/recommend')
def recommend_ui():
    return render_template('recommend.html')

@app.route('/recommend_books' , methods=['POST'])
def recommend():
    book_name = request.form.get('book_name')
    try:
        # Check if book exists in our dataset
        if book_name not in pt.index:
            return render_template('recommend.html', data=None)
            
        index = np.where(pt.index == book_name)[0][0]
        distances = similarity_score[index]
        similar_items = sorted(list(enumerate(distances)), key=lambda x: x[1], reverse=True)[1:6]
        
        data = []
        for i in similar_items:
            item = []
            temp_df = books[books['Book-Title'] == pt.index[i[0]]]
            item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
            item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
            item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
            data.append(item)
            
        return render_template('recommend.html', data=data)
        
    except Exception as e:
        print(f"Error: {e}")
        return render_template('recommend.html', data=None)

if __name__ == '__main__':
    app.run()